using System;

namespace Lab3
{
    class Part1
    {
        public Account Account { get; set; }

        public Part1(Account account)
        {
            Account = account;
        }

        public void Crack()
        {
            Response response = null;
            long[] states = new long[3];
            long m = (long)Math.Pow(2, 32);
            long modInv;

            do
            {
                for (int i = 0; i < states.Length; i++)
                {
                    response = CasinoRoyaleRequestManager.PlayLcg(Account.Id, 1, 1);
                    Account = response.Account;
                    states[i] = response.RealNumber;
                }
            } while (!TryModInverse(states[1] - states[0], m, out modInv));

            int a = CrackUnknownA(states, m, modInv);
            int c = CrackUnknownC(states, m, a);
            Console.WriteLine("a = " + a);
            Console.WriteLine("c = " + c);
            Console.WriteLine("m = " + m);
            Console.WriteLine();

            long bet = Account.Money / 2;
            int next = Next(response.RealNumber, a, c, m);
            response = CasinoRoyaleRequestManager.PlayLcg(Account.Id, bet, next);
            Account = response.Account;
            Console.WriteLine(response);
            Console.WriteLine();
            Console.WriteLine(response.Message);
        }

        public int Next(long last, int a, int c, long m)
        {
            return (int)((a * last + c) % m);
        }

        private int CrackUnknownA(long[] states, long m, long modInv)
        {
            return (int)((states[2] - states[1]) * modInv % m);
        }

        private int CrackUnknownC(long[] states, long m, int a)
        {
            return (int)((states[1] - states[0] * a) % m);
        }

        public static bool TryModInverse(long number, long baseM, out long result)
        {
            if (number < 1 || baseM < 2)
            {
                result = default;

                return false;
            }

            long n = number;
            long tempM = baseM, v = 0, d = 1;

            while (n > 0)
            {
                long t = tempM / n, x = n;
                n = tempM % x;
                tempM = x;
                x = d;
                d = checked(v - t * x);
                v = x;
            }
            result = v % baseM;

            if (result < 0) result += baseM;
            if (number * result % baseM == 1L) return true;
            result = default;

            return false;
        }
    }
}
