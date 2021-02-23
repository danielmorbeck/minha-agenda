var { DateTime } = require('luxon');
let Task = require('../models/task.model');

class TaskController {
  async index (req, res, next) {
    try {
      const tasks = await Task.find({user: req.userId});
      return res.status(200).send(tasks);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }

  async store (req, res, next) {
    try {
      req.body.user = req.userId;

      let dateNow = DateTime.now().toISO();
      
      if (!req.body.dates) {
        req.body.dates = [dateNow];        
      }

      let dates = req.body.dates;

      if (req.body.repeat && !req.body.end_repeat) {
        return res.status(400).send({error: 'You must choose a number of days to end the repetition.'});
      }

      if (req.body.repeat) {
        const lastDateItem = dates.slice(-1);
        let lastDayOfRepetition = DateTime.fromISO(lastDateItem[0]).plus({ days: req.body.end_repeat });
        let lastDate = DateTime.fromISO(lastDateItem[0]);

        while (lastDayOfRepetition > lastDate) {
          switch(req.body.repeat) {
            case 'daily':
              lastDate = lastDate.plus({days: 1});
              if(lastDate <= lastDayOfRepetition) {
                dates.push(lastDate.plus({days: 1}).toISO());
              }
              break;
            case 'weekly':
              lastDate = lastDate.plus({weeks: 1});
              if(lastDate <= lastDayOfRepetition) {
                dates.push(lastDate.plus({weeks: 1}).toISO());
              }
              break;
            case 'monthly':
              lastDate = lastDate.plus({months: 1});
              if(lastDate <= lastDayOfRepetition) {
                dates.push(lastDate.plus({months: 1}).toISO());
              }
              break;
          }
        }
      }

      req.body.dates = dates;

      const task = await Task.create(req.body);
      return res.status(200).send(task);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }
};

module.exports = TaskController;