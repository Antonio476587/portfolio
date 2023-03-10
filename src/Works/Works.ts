import { defineComponent} from "npm:vue";
import worksPresentation from "./worksPresentation.ts";

export default defineComponent ({
    components: {},
    data() {
        return {
            proto: "type",
            worksPresentation,
        }
    },
    template: `
    <a v-for="work in worksPresentation" :href="'/work/' + work.workUrlId">
        <img :src="work.img" :alt="work.alternativeText">
    </a>
    `,
    name: "Works",
})