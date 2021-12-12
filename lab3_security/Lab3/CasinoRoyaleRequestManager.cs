using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;

namespace Lab3
{
    class CasinoRoyaleRequestManager
    {
        private const string URI = "http://95.217.177.249/casino/";

        public static Account CreateAccount(int id = 0)
        {
            for (string jsonString = null; jsonString == null; id++)
            {
                jsonString = GetRequest(URI + "createacc?id=" + id);
                if (jsonString != null)
                {
                    return JsonConvert.DeserializeObject<Account>(jsonString);
                }
            }

            return null;
        }
        private static Response PlayRequest(string mode, int id, long bed, long number)
        {
            string jsonString = GetRequest($"{URI}play{mode}?id={id}&bet={bed}&number={number}");

            return JsonConvert.DeserializeObject<Response>(jsonString);
        }

        public static string GetRequest(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            string responseString = null;

            try
            {
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    responseString = reader.ReadToEnd();
                }
            }
            catch (WebException ex)
            {
                var response = (HttpWebResponse)ex.Response;
                using (var stream = response.GetResponseStream())
                using (var reader = new StreamReader(stream))
                {
                    string errorResponseString = reader.ReadToEnd();
                    Console.WriteLine($"({uri}) -> [{response.StatusCode}]{errorResponseString}");
                }
            }

            return responseString;

        }
        public static Response PlayLcg(int id, long bed, int number)
        {
            return PlayRequest("Lcg", id, bed, number);
        }

        public static Response PlayMt(int id, long bed, uint number)
        {
            return PlayRequest("Mt", id, bed, number);
        }

        public static Response PlayBetterMt(int id, long bed, uint number)
        {
            return PlayRequest("BetterMt", id, bed, number);
        }
    }
}
