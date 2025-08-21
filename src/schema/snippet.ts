import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const snippetSchema: CollectionCreateSchema = {
	name: "snippets",
	fields: [
		{
			name: "id",
			type: "string",
			facet: false
		},
		{
			name: "code",
			type: "string",
			facet: false
		},
		{
			name: "language",
			type: "string",
			facet: true
		}
	]
};
