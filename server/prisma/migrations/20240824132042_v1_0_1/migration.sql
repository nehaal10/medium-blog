-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "blogs_ids" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "create_by" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "blogs" JSONB NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "create_by" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_id_key" ON "User"("id", "email_id");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
