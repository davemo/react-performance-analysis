#!/usr/bin/env node

const fs    = require('fs');
const faker = require('faker');
const SIZE=100;
const TODAY=new Date();

const data = [...Array(SIZE).keys()].map(x => {
  return {
    id: x,
    name: faker.name.findName(),
    address: {
      city: faker.address.city(),
      country: faker.address.country(),
    },
    company: faker.company.companyName(),
    return_date: faker.date.between(
      new Date('2007-01-01'),
      TODAY
    ),
    return_amount: faker.finance.amount()
  }
});

fs.writeFileSync('./data.json', JSON.stringify({data}, null, 2));
