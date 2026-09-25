import { supabase } from "./supabase.js";

const postsContainer = document.getElementById("posts-container");

async function fetchPosts() {

    const { data, error } = await supabase
        .from("posts")
        .select(`
            id,
            caption,
            image_url,
            profiles (
                username
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    if (!data?.length) {
        return;
    }

    postsContainer.innerHTML = "";

    data.forEach(post => {

        const postElement = document.createElement("article");

        postElement.classList.add("post");

        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <div class="small-profile">
                        ${post.profiles?.username?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <strong>
                        @${post.profiles?.username || "unknown"}
                    </strong>
                </div>

                <span>•••</span>
            </div>

            ${
                post.image_url
                ? `<img class="post-image" src="${post.image_url}" alt="Post">`
                : ""
            }

            <div class="post-actions">
                <span>♡</span>
                <span>💬</span>
                <span>✈</span>
                <span class="save">♡</span>
            </div>

            <p class="caption">
                ${post.caption || ""}
            </p>
        `;

        postsContainer.appendChild(postElement);
    });
}

fetchPosts();
const testButton = document.getElementById("test-function");
const functionResult = document.getElementById("function-result");

if (testButton && functionResult) {
    testButton.addEventListener("click", async () => {

        functionResult.textContent = "Testing...";

        const { data, error } = await supabase.functions.invoke("hello");

        if (error) {
            console.error(error);
            functionResult.textContent = "Function failed.";
            return;
        }

        functionResult.textContent = data.message;
    });
}

postsContainer.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button || !button.closest(".post-actions")) {
        return;
    }

    if (button.classList.contains("save")) {
        button.classList.toggle("saved");
        button.textContent = button.classList.contains("saved") ? "♥" : "♡";
        return;
    }

    if (button === button.parentElement.firstElementChild) {
        button.classList.toggle("liked");
        button.textContent = button.classList.contains("liked") ? "♥" : "♡";
    }
});