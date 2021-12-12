using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Lab4
{
    class Document
    {
        public static List<string> ReadList(string path)
        {
            List<string> list = new List<string>();

            using (StreamReader streamReader = new StreamReader(path, Encoding.Default))
            {
                string line;
                while ((line = streamReader.ReadLine()) != null)
                {
                    list.Add(line);
                }
            }

            return list;
        }

        public static void WriteHashList(string path, List<Hash> hashes, char separator, bool isPublic)
        {
            WriteList(path, hashes.Select(h => h.ToString(separator, isPublic)).ToList());
        }

        public static void WriteList(string path, List<string> list)
        {
            using (StreamWriter streamWriter = new StreamWriter(path, false, Encoding.Default))
            {
                for (int i = 0; i < list.Count; i++)
                {
                    streamWriter.WriteLine(list[i]);
                }
            }
        }
    }
}
