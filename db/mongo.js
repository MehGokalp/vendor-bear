db.createCollection('card');

db.card.createIndex({
    reference: 1
}, {
    name: 'card_reference_idx'
});
