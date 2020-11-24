const Person = require('../models/person');

exports.index = async (req, res, next) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        next(error);
    }
}

exports.show = async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        res.status(200).json(person);
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    console.log(req.body);

    try {
        const { name, age, gender} = req.body;
        const p = await Person.create({
            name,
            age,
            gender
        });
        res.status(200).json({message: 'Person was created successfully', status: 'success', person: p});
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { _id, name, age, gender} = req.body;
        const p = await Person.findOneAndUpdate({ _id }, {
          name,
          age,
          gender
        });
        res.status(200).json({message: 'Person was updated successfully', status: 'success', person: p});
      } catch (error) {
        next(error);
      }
}

exports.destroy = async (req, res, next) => {
    try {
        const { _id } = req.body;
        await Person.findOneAndDelete({ _id });
        res.status(200).json({message: 'Person was deleted successfully', status: 'success'});
      } catch (error) {
        next(error);
      }
}

exports.search = async (req, res, next) => {
    // Quick and dirty search algo
    Object
        .entries(req.query)
        .map(
        ([k, v]) => req.query[k] = new RegExp(`${v.split(/\s/).join('|')}`, 'gi')
        );
    console.log(req.query);

    try {
        const people = await Person.find(req.query);
        res.status(200).json(people);
    } catch (error) {
        next(error);
    }
}
