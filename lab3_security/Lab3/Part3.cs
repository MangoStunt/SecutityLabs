using System;

namespace Lab3
{
    class Part3
    {
        public Account Account { get; set; }

        public Part3(Account account)
        {
            Account = account;
        }

        public void Crack()
        {
            Response response = null;
            uint[] randomNums = new uint[624];

            for (int i = 0; i < randomNums.Length; i++)
            {
                response = CasinoRoyaleRequestManager.PlayBetterMt(Account.Id, 1, 0);
                Account = response.Account;
                randomNums[i] = (uint)response.RealNumber;
                Console.WriteLine($"[{i}] -> {response.RealNumber}");
            }
            Console.WriteLine();

            MersenneTwister mersenneTwister = new MersenneTwister();
            mersenneTwister.States = RecoverStateMt(randomNums);

            response = CasinoRoyaleRequestManager.PlayBetterMt(Account.Id, Account.Money / 2, mersenneTwister.Next());
            Account = response.Account;
            Console.WriteLine(response);
            Console.WriteLine();
            Console.WriteLine(response.Message);
        }

        private uint[] RecoverStateMt(uint[] numbers)
        {
            uint[] states = new uint[624];

            for (int i = 0; i < states.Length; i++)
            {
                states[i] = Untemper(numbers[i]);
            }

            return states;
        }

        private uint Untemper(uint inValue)
        {
            const int u = 11;
            const int s = 7;
            const uint b = 0x9D2C5680;
            const int t = 15;
            const uint c = 0xEFC60000;
            const int l = 18;
            const int mask = 0x7F;

            uint y = inValue ^ (inValue >> l);
            y = y ^ ((y << t) & c);

            for (int i = 0; i < 4; i++)
            {
                uint _b = b & (uint)(mask << (s * (i + 1)));
                y = y ^ ((y << s) & _b);
            }

            for (int i = 0; i < 3; i++)
            {
                y = y ^ (y >> u);
            }

            return y;
        }
    }
}
