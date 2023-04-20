-- CreateTable
CREATE TABLE "onlinelist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onlinelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT,
    "nickname" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "located" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "errors" (
    "id" SERIAL NOT NULL,
    "errorId" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT,
    "located" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);
