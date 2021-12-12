using System;
using System.Collections.Generic;

namespace Lab4
{
    class HumanLikePasswordGenerator
    {
        private static readonly string[] SYMBOLS = {
            "!@#$%&*()",
            "1234567890",
            "qwertyuiop",
            "asdfghjkl",
            "zxcvbnm",
            "abcdefghijklmnopqrstuvwxyz",
        };
        private static readonly List<string> WORDS = Document.ReadList("..\\..\\..\\..\\_resources\\words.txt");
        private static readonly List<string> NAMES = Document.ReadList("..\\..\\..\\..\\_resources\\names.txt");

        public static string Create()
        {
            string password;
            Random random = new Random();

            int mode = random.Next(0, 100);
            if (mode >= 0 && mode < 35) password = CreateFromNumbers(random.Next(4, 10));
            else if (mode >= 35 && mode < 50) password = CreateFromDate();
            else if (mode >= 50 && mode < 70) password = CreateFromSequentialLettersWithNumbers();
            else if (mode >= 70 && mode < 90) password = CreateFromNameWithNumbers();
            else if (mode >= 90 && mode < 99) password = CreateFromWordsWithNumbers();
            else password = CreateRandom();

            int addSpecialCharacterFlag = random.Next(0, 100);
            if (addSpecialCharacterFlag >= 0 && addSpecialCharacterFlag < 1) password = AddSpecialCharacter(password);
            int replaceCharactersFlag = random.Next(0, 100);
            if (replaceCharactersFlag >= 0 && replaceCharactersFlag < 2) password = ReplaceCharacters(password);

            return password;
        }

        public static string CreateFromNumbers(int count = 4)
        {
            return (new Random().Next(0, 2) == 1 ? CreateFromRepeatingNumbers(count) : CreateFromSequentialNumbers(count));
        }

        public static string CreateFromRepeatingNumbers(int count = 4)
        {
            return new string((char)(new Random().Next(0, 10) + '0'), count);
        }

        public static string CreateFromSequentialNumbers(int count = 4)
        {
            char[] password = SYMBOLS[1].Substring(0, count).ToCharArray();
            if (new Random().Next(0, 2) == 1)
            {
                Array.Reverse(password);
            }

            return new string(password);
        }

        public static string CreateFromDate()
        {
            Random random = new Random();

            return DigitToString(
                random.Next(1, 32))
                + DigitToString(random.Next(1, 13))
                + DigitToString(random.Next(1900, 2021)
                );
        }

        public static string CreateFromSequentialLettersWithNumbers()
        {
            Random random = new Random();

            string str = SYMBOLS[random.Next(2, SYMBOLS.Length)];
            char[] word = str.Substring(0, random.Next(4, 8)).ToCharArray();
            if (random.Next(0, 2) == 1)
            {
                Array.Reverse(word);
            }

            return ChangeLetterCase(new string(word) + CreateFromNumbers(random.Next(0, Math.Abs(12 - word.Length) % 10)));
        }

        public static string CreateFromNameWithNumbers()
        {
            Random random = new Random();
            string name = NAMES[random.Next(0, NAMES.Count)];

            return ChangeLetterCase(name + CreateFromNumbers(random.Next(0, Math.Abs(12 - name.Length) % 10)));
        }

        public static string CreateFromWordsWithNumbers()
        {
            Random random = new Random();
            string word = WORDS[random.Next(0, WORDS.Count)];

            return ChangeLetterCase(word + CreateFromNumbers(random.Next(0, Math.Abs(12 - word.Length) % 10)));
        }

        public static string CreateRandom()
        {
            string password = "";
            Random random = new Random();

            int length = random.Next(4, 20);
            string buf = SYMBOLS[1] + SYMBOLS[0] + SYMBOLS[5];

            for (int i = 0; i < length; i++)
            {
                password += buf[random.Next(0, buf.Length)];
            }

            return ChangeLetterCase(password);
        }

        private static string ChangeLetterCase(string input)
        {
            string output = "";
            Random random = new Random();

            int mode = random.Next(0, 100);

            if (mode >= 0 && mode < 40) output = input.ToLower();
            else if (mode >= 40 && mode < 50) output = input.ToUpper();
            else if (mode >= 50 && mode < 90)
            {
                output += input[0].ToString().ToUpper();
                output += input.Substring(1);
            }
            else if (mode >= 90 && mode < 100)
            {
                for (int i = 0; i < input.Length; i++)
                {
                    output += random.Next(0, 2) == 0 ? input[i].ToString().ToLower() : input[i].ToString().ToUpper();
                }
            }
            else output = input;

            return output;
        }

        private static string AddSpecialCharacter(string password)
        {
            return password + SYMBOLS[0][new Random().Next(0, SYMBOLS[0].Length)];
        }

        private static string ReplaceCharacters(string password)
        {
            int mode = new Random().Next(0, 100);

            if (mode >= 0 && mode < 40) return password.Replace('i', '1').Replace('I', '1');
            else if (mode >= 40 && mode < 80) return password.Replace('o', '0').Replace('O', '0');
            else if (mode >= 80 && mode < 100) return password.Replace('B', '8');
            else return password;
        }


        private static string DigitToString(int digit)
        {
            string str = digit + "";

            return (str.Length == 1 ? "0" + str : str);
        }
    }
}
