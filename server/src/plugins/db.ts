import { FastifyMongodbOptions, fastifyMongodb } from "@fastify/mongodb";
import fp from "fastify-plugin";

// /**
//  * This plugins adds some utilities to handle mongodb queries
//  *
//  * @see https://github.com/fastify/fastify-mongodb
//  */

export default fp<FastifyMongodbOptions>(async (fastify) => {
  fastify.register(fastifyMongodb, {
    url: "mongodb://mongoadmin:secret@localhost:27017/",
    database: "local",
    forceClose: true,
  });
});
