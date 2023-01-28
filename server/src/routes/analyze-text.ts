import { FastifyPluginAsync } from "fastify";
// import { writeFileSync } from "fs";
import { SentenceTokenizer, Lexicon, RuleSet, BrillPOSTagger } from "natural";
// import * as Pg from "pg";
// import SQL from "sql-template-strings";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  type Sentence = {
    text: string;
    nouns: string[];
    pronouns: string[];
    adjectives: string[];
    adverbs: string[];
  };

  type Insight = {
    id?: string;
    filename: string;
    wordcount: number;
    sentences: Sentence[];
  };

  fastify.post("/analyze-text", async function (request, reply) {
    const data = await request.file();

    const text = await data?.toBuffer();
    const sentenceTokenizer = new SentenceTokenizer();
    const sentences = sentenceTokenizer.tokenize(text?.toString() as string);

    const result = {
      filename: data?.filename as string,
      wordcount: 0,
      sentences: [],
    } as Insight;

    let wordcount = 0;
    for (let i = 0; i < sentences.length; i++) {
      const lexicon = new Lexicon("EN", "N");
      const ruleSet = new RuleSet("EN");
      const tagger = new BrillPOSTagger(lexicon, ruleSet);
      const { taggedWords } = tagger.tag(sentences[i].split(" "));

      const nouns = [] as string[];
      const pronouns = [] as string[];
      const adjectives = [] as string[];
      const adverbs = [] as string[];

      for (let j = 0; j < taggedWords.length; j++) {
        if (taggedWords[j].tag === "NN") {
          nouns.push(taggedWords[j].token);
        } else if (taggedWords[j].tag === "PRP") {
          pronouns.push(taggedWords[j].token);
        } else if (taggedWords[j].tag === "JJ") {
          adjectives.push(taggedWords[j].token);
        } else if (taggedWords[j].tag === "RB") {
          adverbs.push(taggedWords[j].token);
        }
      }

      wordcount += taggedWords.length;

      result.sentences.push({
        text: sentences[i],
        nouns,
        pronouns,
        adjectives,
        adverbs,
      });
    }

    result.wordcount = wordcount;

    try {
      await fastify.mongo.db?.collection("insights").insertOne(result);
    } catch (err) {
      return err;
    }

    return null;
  });

  fastify.get(
    "/get-insights",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                filename: { type: "string" },
                wordcount: { type: "integer" },
                nouns: { type: "integer" },
                pronouns: { type: "integer" },
                adjectives: { type: "integer" },
                adverbs: { type: "integer" },
                sentences: { type: "integer" },
              },
            },
          },
        },
      },
    },
    async function (request, reply) {
      try {
        const results = await fastify.mongo.db
          ?.collection("insights")
          .find()
          .project({
            _id: { $toString: "$_id" },
            wordcount: 1,
            filename: 1,
            sentences: { $size: "$sentences" },
          })
          .toArray();
        const totals = await fastify.mongo.db
          ?.collection("insights")
          .aggregate([
            { $unwind: "$sentences" },
            {
              $group: {
                _id: { $toString: "$_id" },
                nouns: { $sum: { $size: "$sentences.nouns" } },
                pronouns: { $sum: { $size: "$sentences.pronouns" } },
                adjectives: { $sum: { $size: "$sentences.adjectives" } },
                adverbs: { $sum: { $size: "$sentences.adverbs" } },
              },
            },
          ])
          .toArray();

        for (let i = 0; i < results!.length || 0; i++) {
          for (let j = 0; j < totals!.length || 0; j++) {
            if (results![i]._id === totals![j]._id) {
              results![i]["nouns"] = totals![j].nouns;
              results![i]["pronouns"] = totals![j].pronouns;
              results![i]["adjectives"] = totals![j].adjectives;
              results![i]["adverbs"] = totals![j].adverbs;
              break;
            }
          }
        }

        return results || [];
      } catch (err) {
        reply.statusCode = 500;
        return err;
      }
    }
  );

  fastify.get(
    "/insights/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
          additionalProperties: false,
        },
        querystring: {
          type: "object",
          properties: {
            limit: { type: "integer", minimum: 1 },
          },
          required: ["limit"],
          additionalProperties: false,
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                nouns: { type: "array", items: { type: "string" } },
                pronouns: { type: "array", items: { type: "string" } },
                adjectives: { type: "array", items: { type: "string" } },
                adverbs: { type: "array", items: { type: "string" } },
              },
            },
          },
        },
      },
    },
    async function (request, reply) {
      try {
        const { id } = request.params as { id: string };
        const { limit } = request.query as { limit: number };
        const results = await fastify.mongo.db?.collection("insights").findOne(
          { _id: new fastify.mongo.ObjectId(id) },
          {
            projection: {
              sentences: { $slice: limit },
              wordcount: 0,
              filename: 0,
              _id: 0,
            },
          }
        );

        return results?.sentences || [];
      } catch (error) {
        return error;
      }
    }
  );
};

export default root;
