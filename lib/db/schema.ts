import { pgTable, text, uuid, integer, boolean,timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';



export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey(),

    name: text('name').notNull(),
    path: text('path').notNull(),  
    size: integer('size').notNull(),
    type: text('type').notNull(),

    fileUrl: text('file_url').notNull(),
    thumbnailUrl: text('thumbnail_url'),

    //ownership
    userId: text('user_id').notNull(),
    parentId: uuid('parent_id'), // parent folder id


    // file/folder flags
    isFolder: boolean('is_folder').default(false).notNull(),
    isStarreds: boolean('is_starred').default(false).notNull(),
    isTrash: boolean('is_trash').default(false).notNull(),

    //timestamps
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),

})

// parent dir - only one 
// children - many files/folders

export const filesRelations = relations(files, ({one,many})=>({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
        }),

    children: many(files)
}))

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;