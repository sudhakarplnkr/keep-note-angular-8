using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using ReminderService.Models;

namespace ReminderService.Repository
{
    public class ReminderRepository : IReminderRepository
    {
        //define a private variable to represent ReminderContext
        private readonly ReminderContext reminderContext;

        public ReminderRepository(ReminderContext _context)
        {
            reminderContext = _context;
        }
        //This method should be used to save a new reminder.
        public Reminder CreateReminder(Reminder reminder)
        {
            var recent = reminderContext.Reminders.Find(f => f.Id != 0).ToList().OrderByDescending(o => o.Id).FirstOrDefault();
            var id = 201;
            if (recent != null)
            {
                id = recent.Id + 1;
            }
            reminder.Id = id;
            reminder.CreationDate = DateTime.Now;
            //reminder Id should be auto generated and must start from 201
            reminderContext.Reminders.InsertOne(reminder);
            return reminder;
        }
        //This method should be used to delete an existing reminder.
        public bool DeleteReminder(int reminderId)
        {
            var reminder = GetReminderById(reminderId);
            if (reminder == null)
            {
                return false;
            }
            reminderContext.Reminders.DeleteOne(r => r.Id == reminderId);
            return true;
        }
        //This method should be used to get all reminders by userId
        public List<Reminder> GetAllRemindersByUserId(string userId)
        {
            return reminderContext.Reminders.Find(re => re.CreatedBy == userId).ToList();
        }
        //This method should be used to get a reminder by reminderId
        public Reminder GetReminderById(int reminderId)
        {
            return reminderContext.Reminders.Find(c => c.Id == reminderId).FirstOrDefault();
        }
        // This method should be used to update an existing reminder.
        public bool UpdateReminder(int reminderId, Reminder reminder)
        {
            reminderContext.Reminders.ReplaceOne(c => c.Id == reminderId, reminder);
            return true;
        }
    }
}
