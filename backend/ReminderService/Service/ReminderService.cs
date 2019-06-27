using System;
using System.Collections.Generic;
using System.Linq;
using ReminderService.Exceptions;
using ReminderService.Models;
using ReminderService.Repository;

namespace ReminderService.Service
{
    public class ReminderService : IReminderService
    {
        //define a private variable to represent repository
        private readonly IReminderRepository repository;


        //Use constructor Injection to inject all required dependencies.

        public ReminderService(IReminderRepository reminderRepository)
        {
            repository = reminderRepository;
        }

        //This method should be used to save a new reminder.
        public Reminder CreateReminder(Reminder reminder)
        {
            var reminders = repository.CreateReminder(reminder);
            if (reminders != null)
            {
                return reminder;
            }
            else
            {
                throw new ReminderNotCreatedException($"This reminder already exists");
            }
        }
        //This method should be used to delete an existing reminder.
        public bool DeleteReminder(int reminderId)
        {
            var isDeleted = repository.DeleteReminder(reminderId);
            if (!isDeleted)
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
            return true;
        }
        // This method should be used to get all reminders by userId
        public List<Reminder> GetAllRemindersByUserId(string userId)
        {
            var reminderList = repository.GetAllRemindersByUserId(userId);

            return reminderList;
        }
        //This method should be used to get a reminder by reminderId.
        public Reminder GetReminderById(int reminderId)
        {
            var reminder = repository.GetReminderById(reminderId);
            if (reminder != null)
            {
                return reminder;
            }
            else
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
        }
        //This method should be used to update an existing reminder.
        public bool UpdateReminder(int reminderId, Reminder reminder)
        {
            var reminderToUpdate = repository.GetReminderById(reminderId);
            if (reminderToUpdate == null)
            {
                throw new ReminderNotFoundException($"This reminder id not found");
            }
            reminderToUpdate.CreatedBy = reminder.CreatedBy;
            reminderToUpdate.Description = reminder.Description;
            reminderToUpdate.Name = reminder.Name;
            var isUpdated = repository.UpdateReminder(reminderId, reminderToUpdate);
            return isUpdated;
        }
    }
}
