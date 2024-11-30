
 export const AddLike = (product) => {
 

    let likes = [];

    if (typeof window !== 'undefined') {
        // Get the likes from localStorage
        if (localStorage.getItem("likes")) {
            likes = JSON.parse(localStorage.getItem("likes"));
        }

        // Check if the product is already in the liked list
        const existingItem = likes.find(likeItem => likeItem._id === product._id);

        if (existingItem) {
            console.log("This product is already in the liked list");
        } else {
            // Add the new product to the likes list
            likes.push({ ...product });

            // Save the updated likes list to localStorage
            localStorage.setItem("likes", JSON.stringify(likes));
        }

        // Log all liked items
        likes.forEach(item => console.log(item));
    }



};

export const GetLikes = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("likes")) {
            return JSON.parse(localStorage.getItem("likes"));
        }
    }
    return [];
};

export const DeleteLike = (productId) => {
    let likes = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('likes')) {
            likes = JSON.parse(localStorage.getItem("likes"));
        }

        likes.map((item, index) => {
            if (item._id === productId) {
                likes.splice(index, 1)
                window.location.reload();
            }

        })

        localStorage.setItem("likes", JSON.stringify(likes)); // Save the likes

    }
};
    