-- AlterTable
CREATE SEQUENCE request_id_seq;
ALTER TABLE "Request" ALTER COLUMN "id" SET DEFAULT nextval('request_id_seq');
ALTER SEQUENCE request_id_seq OWNED BY "Request"."id";
