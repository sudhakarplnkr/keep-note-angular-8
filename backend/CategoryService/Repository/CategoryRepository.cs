using System;
using System.Collections.Generic;
using System.Linq;
using CategoryService.Models;
using MongoDB.Driver;

namespace CategoryService.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        //define a private variable to represent CategoryContext
        private readonly CategoryContext categoryContext;

        public CategoryRepository(CategoryContext _context)
        {
            categoryContext = _context;
        }

        //This method should be used to save a new category.
        public Category CreateCategory(Category category)
        {
            var recent = categoryContext.Categories.Find(f => f.Id != 0).ToList().OrderByDescending(o => o.Id).FirstOrDefault();
            var id = 103;
            if (recent != null)
            {
                id = recent.Id + 1;
            }
            category.Id = id;
            category.CreationDate = DateTime.Now;
            categoryContext.Categories.InsertOne(category);
            return category;
        }

        //This method should be used to delete an existing category.
        public bool DeleteCategory(int categoryId)
        {
            var category = GetCategoryById(categoryId);
            if (category == null)
            {
                return false;
            }
            categoryContext.Categories.DeleteOne(c => c.Id == categoryId);
            return true;
        }

        //This method should be used to get all category by userId
        public List<Category> GetAllCategoriesByUserId(string userId)
        {
            return categoryContext.Categories.Find(c => c.CreatedBy == userId).ToList();
        }

        //This method should be used to get a category by categoryId
        public Category GetCategoryById(int categoryId)
        {
            return categoryContext.Categories.Find(c => c.Id == categoryId).FirstOrDefault();
        }

        // This method should be used to update an existing category.
        public bool UpdateCategory(int categoryId, Category category)
        {
            categoryContext.Categories.ReplaceOne(c => c.Id == categoryId, category);
            return true;
        }
    }
}
