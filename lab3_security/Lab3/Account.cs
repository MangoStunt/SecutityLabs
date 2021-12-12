using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Lab3
{
    class Account
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("money")]
        public long Money { get; set; }

        [JsonPropertyName("deletionTime")]
        public string DeletionTime { get; set; }

        public override string ToString()
        {
            return $"{{ [id]: {Id}; [money]: {Money}; [deletionTime]: {DeletionTime}] }}";
        }
    }
}
