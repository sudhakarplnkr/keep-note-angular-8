using System;
using System.Collections.Generic;
using CategoryService.Models;
using CategoryService.Repository;
using CategoryService.Exceptions;
using MongoDB.Driver;
using System.Linq;

namespace CategoryService.Service
{
    public class CategoryService:ICategoryService
    {
        //define a private variable to represent repository
        private readonly ICategoryRepository categoryRepository;

        //Use constructor Injection to inject all required dependencies.
        public CategoryService(ICategoryRepository _repository)
        {
            categoryRepository = _repository;
        }

        //This method should be used to save a new category.
        public Category CreateCategory(Category category)
        {
            var categorys = categoryRepository.CreateCategory(category);
            if (categorys != null)
            {
                return category;
            }
            else
            {
                throw new CategoryNotCreatedException($"This category already exists");
            }
        }
        //This method should be used to delete an existing category.
        public bool DeleteCategory(int categoryId)
        {
            var isDeleted = categoryRepository.DeleteCategory(categoryId);
            if (!isDeleted)
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
            return true;
        }
        // This method should be used to get all category by userId
        public List<Category> GetAllCategoriesByUserId(string userId)
        {
            var categoryList = categoryRepository.GetAllCategoriesByUserId(userId);

            return categoryList;
        }
        //This method should be used to get a category by categoryId.
        public Category GetCategoryById(int categoryId)
        {
            var category = categoryRepository.GetCategoryById(categoryId);
            if (category != null)
            {
                return category;
            }
            else
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
        }
        //This method should be used to update an existing category.
        public bool UpdateCategory(int categoryId, Category category)
        {
            var categoryToUpdate = categoryRepository.GetCategoryById(categoryId);
            if (categoryToUpdate == null)
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
            categoryToUpdate.Description = category.Description;
            categoryToUpdate.CreatedBy = category.CreatedBy;
            categoryToUpdate.Name = category.Name;
            var isUpdated = categoryRepository.UpdateCategory(categoryId, categoryToUpdate);
            return isUpdated;
        }
    }
}
