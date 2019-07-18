
exports.up = function(knex) {
    return knex.schema.createTable('zoos', tbl => {
        tbl.increments(); //primary key w/ auto-increment
        tbl.string('name', 128)
           .unique()
           .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('zoos');
};
