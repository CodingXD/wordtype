import fp from "fastify-plugin";
import { fastifyMultipart, FastifyMultipartOptions } from "@fastify/multipart";

/**
 * This plugins adds some utilities to handle file uploads
 *
 * @see https://github.com/fastify/fastify-multipart
 */
export default fp<FastifyMultipartOptions>(async (fastify) => {
  fastify.register(fastifyMultipart);
});
