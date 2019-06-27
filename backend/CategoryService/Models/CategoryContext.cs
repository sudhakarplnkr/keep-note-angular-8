using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;

namespace CategoryService.Models
{
    public class CategoryContext
    {
        //declare variable to connect to MongoDB database
        MongoClient mongoClient;
        IMongoDatabase database;

        public CategoryContext(IConfiguration configuration)
        {
            //string constr = Environment.GetEnvironmentVariable("mongo_db");

            //if (constr == null)
            //{
            //    constr = configuration.GetSection("MongoDB:server").Value;
            //}
            //Initialize MongoClient and Database using connection string and database name from configuration
            mongoClient = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value);
            database = mongoClient.GetDatabase(configuration.GetSection("MongoDB:CategoryDatabase").Value);
        }

        //Define a MongoCollection to represent the Categories collection of MongoDB
        public IMongoCollection<Category> Categories => database.GetCollection<Category>("Categories");
    }
}
