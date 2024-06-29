CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255),
	"cellPhone" varchar(255),
	"address_line1" varchar(255),
	"address_line2" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"zipCode" varchar(255),
	"created_at" timestamp NOT NULL
);
