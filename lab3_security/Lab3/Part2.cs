using System;

namespace Lab3
{
    class Part2
    {
        public Account Account { get; set; }

        public Part2(Account account)
        {
            Account = account;
        }

        public void Crack()
        {
            int seed = (int)DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            MersenneTwister mersenneTwister = null;

            Response response = CasinoRoyaleRequestManager.PlayMt(Account.Id, 1, 1);
            Account = response.Account;

            for (int i = -60; i <= 60; i++)
            {
                mersenneTwister = new MersenneTwister((uint)(seed + i));

                if (mersenneTwister.Next() == response.RealNumber)
                {
                    seed += i;
                    Console.WriteLine($"seed = {seed}");
                    break;
                }
            }
            Console.WriteLine();

            response = CasinoRoyaleRequestManager.PlayMt(Account.Id, Account.Money / 2, mersenneTwister.Next());
            Account = response.Account;
            Console.WriteLine(response);
            Console.WriteLine();
            Console.WriteLine(response.Message);
        }
    }
}
