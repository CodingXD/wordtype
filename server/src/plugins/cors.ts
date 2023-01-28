import fp from "fastify-plugin";
import { FastifyCorsOptions, fastifyCors } from "@fastify/cors";

/**
 * This plugins adds some utilities to handle cors
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: "*",
    methods: ["POST", "GET"],
  });
});
