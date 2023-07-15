-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_employer_id_fkey";

-- DropForeignKey
ALTER TABLE "employers" DROP CONSTRAINT "employers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "remunerations" DROP CONSTRAINT "remunerations_employer_id_fkey";

-- AddForeignKey
ALTER TABLE "employers" ADD CONSTRAINT "employers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remunerations" ADD CONSTRAINT "remunerations_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
