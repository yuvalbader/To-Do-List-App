- There are two problems that sometimes you have to click twice on the delete button / the list is not updated but only in the next rendering.
  I am aware of it and unfortunately I have not been able to resolve it. I think it's a sync issue but I could not trace it. I'd be happy if we could go up for a zoom call and try to resolve it together.

- Add "Done" timestamp from bonus - added to db, did not add to ui due to lack of time

### The requirements:

- [x] Install Sequelize CLI. [Installing the CLI](https://sequelize.org/docs/v6/other-topics/migrations/)
- [x] Initialize Sequelize using `npx sequelize-cli init` inside 'src/server/db' folder
- [x] Create Items table using [Sequelize migration](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-model-and-migration) - a new table with id and ItemName fields
- [x] Modify `item_manager.js`: remove items array and modify all item operations to use Item model
- [x] Create and run a separate migration for adding a `status` column (BOOLEAN) to Items table in your DB
- [x] Add checkbox to each item in UI to indicate its status (Done vs not)
- [x] Modify client and server code to support persistence of the new Item status

### Bonus

- [x] Add "Done" timestamp - #added to db, I added to db, I did not add to ui due to lack of time#
- [ ] Add index to the Items table (which columns compose the index?)
- [ ] Add server validation - create a new item only if not exists (Use transaction)
- [ ] Add edit capabilities to an item.
