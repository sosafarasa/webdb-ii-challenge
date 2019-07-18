
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('zoos').del()
    .then(function () {
      // Inserts seed entries
      return knex('zoos').insert([
        { name: 'Zoo 1.0'},
        { name: 'Zoo 2.0'},
        { name: 'Zoo 3.0'}
      ]);
    });
};
