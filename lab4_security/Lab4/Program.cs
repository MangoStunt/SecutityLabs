using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Lab4
{
    class Program
    {
        static void Main(string[] args)
        {
            int passwordCount = 100_000;

            List<string> passwordTop100List = Document.ReadList("..\\..\\..\\..\\_resources\\password_top_100.txt");
            List<string> passwordTop1MList = Document.ReadList("..\\..\\..\\..\\_resources\\password_top_1m.txt");

            List<string> forMd5passwords = new List<string>(passwordCount);
            List<string> forSha1passwords = new List<string>(passwordCount);

            Console.WriteLine("Passwords generating...");
            for (int i = 0; i < passwordCount; i++)
            {
                forMd5passwords.Add(HumanLikePasswordGenerator.Create());
                forSha1passwords.Add(HumanLikePasswordGenerator.Create());
            }

            //Console.WriteLine($"Percentage of passwords (MD5) in Top100: {ComparePasswordLists(forMd5passwords, passwordTop100List)}%");
            //Console.WriteLine($"Percentage of passwords (MD5) in Top1M: {ComparePasswordLists(forMd5passwords, passwordTop1MList)}%");
            //Console.WriteLine($"Percentage of passwords (SHA1) in Top100: {ComparePasswordLists(forSha1passwords, passwordTop100List)}%");
            //Console.WriteLine($"Percentage of passwords (SHA1) in Top1M: {ComparePasswordLists(forSha1passwords, passwordTop1MList)}%");


            Console.WriteLine("Hashing MD5...");
            List<Hash> hashesMd5 = new List<Hash>();
            for (int i = 0; i < passwordCount; i++)
            {
                Hash hash = HashMD5(forMd5passwords[i], CreateSalt());
                hashesMd5.Add(hash);
            }
            Document.WriteHashList("..\\..\\..\\..\\_output_hashes\\hashes_md5.csv", hashesMd5, ';', false);
            Document.WriteHashList("..\\..\\..\\..\\_output_hashes\\hashes_md5.txt", hashesMd5, ':', false);
            Document.WriteHashList("..\\..\\..\\..\\_output_hashes\\hashes_md5_public.txt", hashesMd5, '\t', true);

            Console.WriteLine("Hashing SHA1...");
            List<Hash> hashesSha1 = new List<Hash>();
            for (int i = 0; i < passwordCount; i++)
            {
                Hash hash = HashSHA1(forSha1passwords[i], CreateSalt());
                hashesSha1.Add(hash);
            }
            Document.WriteHashList("..\\..\\..\\..\\_output_hashes\\hashes_sha1.csv", hashesSha1, ';', false);
            Document.WriteHashList("..\\..\\..\\..\\_output_hashes\\hashes_sha1.txt", hashesSha1, ':', false);
            Document.WriteHashList("..\\..\\..\\..\\_output_hashes\\hashes_sha1_public.txt", hashesSha1, '\t', true);
        }

        public static double ComparePasswordLists(List<string> list1, List<string> list2)
        {
            int count = 0;

            for (int i = 0; i < list1.Count; i++)
            {
                if (list2.Contains(list1[i]))
                {
                    count++;
                }
            }

            return (double)count / list1.Count * 100.0;
        }

        public static string CreateSalt(int length = 16)
        {
            byte[] bytes = new byte[length];
            new Random().NextBytes(bytes);

            return FromByteArrayToHexString(bytes);
        }

        public static Hash HashMD5(string text, string salt)
        {
            byte[] bytes = FromStringToByteArray(text + salt);
            byte[] hash = MD5.Create().ComputeHash(bytes);
            string hashedText = FromByteArrayToHexString(hash);

            return new Hash(hashedText, salt, text);
        }

        public static bool VerifyMD5(string text, string hash, string salt)
        {
            return HashMD5(text, salt).HashText.Equals(hash);
        }

        public static Hash HashSHA1(string text, string salt)
        {
            byte[] bytes = FromStringToByteArray(text + salt);
            byte[] hash = new SHA1Managed().ComputeHash(bytes);
            string hashedText = FromByteArrayToHexString(hash);

            return new Hash(hashedText, salt, text);
        }

        public static bool VerifySHA1(string text, string hash, string salt)
        {
            return HashSHA1(text, salt).HashText.Equals(hash);
        }

        public static string FromByteArrayToHexString(byte[] bytes)
        {
            return BitConverter.ToString(bytes).Replace("-", string.Empty).ToLower();
        }

        public static byte[] FromStringToByteArray(string text)
        {
            return Encoding.UTF8.GetBytes(text);
        }
    }
}
