-- CreateTable
CREATE TABLE "user" (
    "username" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "hobbies" (
    "username" VARCHAR(100) NOT NULL,
    "hobbies" TEXT[],

    CONSTRAINT "hobbies_pkey" PRIMARY KEY ("username")
);

-- AddForeignKey
ALTER TABLE "hobbies" ADD CONSTRAINT "hobbies_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE CASCADE;
