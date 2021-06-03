import { client, q } from "./db";

export const getAllEntries = client
  .query(q.Paginate(q.Match(q.Ref("indexes/all_entries"))))
  .then(response => {
    const entriesRefs = response.data;
    // create new query out of entries refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProductDataQuery = entriesRefs.map(ref => {
      return q.Get(ref);
    });
    // query the refs
    return client.query(getAllProductDataQuery).then(data => data);
  })
  .catch(error => console.warn("error", error.message));

export const editNote = (entryId, newText) =>
  client
    .query(
      q.Update(q.Ref(q.Collection("entries"), entryId), {
        data: { text: newText }
      })
    )
    .then(ret => console.log(ret))
    .catch(err => console.warn(err));

export const deleteNote = entryRef =>
  client
    .query(q.Delete(q.Ref(q.Collection("entries"), entryRef)))
    .then(res => res)
    .catch(err => console.warn(err.message));

export const createNote = text =>
  client
    .query(
      q.Create(q.Collection("entries"), {
        data: {
          text
        }
      })
    )
    .then(ret => ret)
    .catch(err => console.warn(err));
