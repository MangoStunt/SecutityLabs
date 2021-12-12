using System;

namespace Lab3
{
    class Program
    {
        static void Main(string[] args)
        {
            Account account = CasinoRoyaleRequestManager.CreateAccount(7000);
            Console.WriteLine();
            Console.WriteLine(account);
            Console.WriteLine();

            Console.WriteLine($"\n{new string('-', 100)}\n");
            new Part1(account).Crack();
            Console.WriteLine($"\n{new string('-', 100)}\n");
            new Part2(account).Crack();
            Console.WriteLine($"\n{new string('-', 100)}\n");
            new Part3(account).Crack();
            Console.WriteLine($"\n{new string('-', 100)}\n");
        }
    }
}
