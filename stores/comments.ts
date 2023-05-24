import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useCommentStore = defineStore("commentStore", () => {
    async function deleteComment(id: string) {
        const options: UseFetchOptions<T> = {
            method: "DELETE",
        };
        await useFetchApi(`/comments/${id}/delete`, options)
    }

    return {
        deleteComment
    };
});
