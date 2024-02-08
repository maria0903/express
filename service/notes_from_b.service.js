const { query, notes } = require('../lib/db');

class NotesFromBService {
  constructor() {
    this.notes = [];
  }

  async insertNotes() {
    await query(async () => {
      await notes.insertMany([
        { name: 'Yasushi', mail: 'osonoi@cu', tel: '1111' },
        { name: 'Koh', mail: 'kojima@cu', tel: '2222' },
        { name: 'Alice', mail: 'alice@example.com', tel: '3333' },
        { name: 'Bob', mail: 'bob@example.com', tel: '4444' },
        { name: 'Charlie', mail: 'charlie@example.com', tel: '5555' },
        { name: 'David', mail: 'david@example.com', tel: '6666' },
        { name: 'Eve', mail: 'eve@example.com', tel: '7777' },
        { name: 'Frank', mail: 'frank@example.com', tel: '8888' },
        { name: 'Grace', mail: 'grace@example.com', tel: '9999' },
        { name: 'Henry', mail: 'henry@example.com', tel: '0000' },  
      ]);
    });

    return true;
  }

  async getNotes() {
    const result = await query(async () => {
      return await notes.find({}).toArray();
    });

    return result;
  }
}

module.exports = new NotesFromBService();