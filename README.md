# Reflections

I tried to extract re-usable logic for endpoint data pagination but found it difficult to cleanly separate logic to do with the specific endpoint and pagination logic, partly because I needed the total count of GIFs from the first endpoint call to properly indicate if there were more GIFs available. As it stands, there is a lot of duplicated logic, and the hooks don’t feel very reusable. If doing this for production, I’d look into available libraries for things like pagination.

The intention was to rely on the browser to cache the GIFs after they are first fetched. More care might be needed to ensure this is being done as expected.

## Possible Optimisations:

- Check user internet speed and load downsampled GIFs if we suspect speed is low.
- Better styling of the UI, including custom user feedback popups rather than native browser alerts, and scroll-to-top on navigation to the next page of results.
- Provide better user feedback when the API returns an error (currently we just return no GIFs).
- Handle “two stage” loading in the UI – call to the endpoint to retrieve URLs, then loading of GIFs from the URLs. Currently, only handling the second stage with skeletons because the initial call is fast, but this might present more of an issue on very slow connections.
- Some kind of runtime endpoint typeguards.
- Better accessibility support.
