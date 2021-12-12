namespace Lab4
{
    class Hash
    {
        public string HashText { get; set; }

        public string Salt { get; set; }

        public string Text { get; set; }

        public Hash(string hash, string salt, string text)
        {
            HashText = hash;
            Salt = salt;
            Text = text;
        }

        public string ToString(char separator = ';', bool isPublic = true)
        {
            return $"{HashText}{separator}{Salt}{(isPublic ? separator + Text : "")}";
        }

        public override string ToString()
        {
            return $"{HashText}\t{Salt}\t{Text}";
        }
    }
}
