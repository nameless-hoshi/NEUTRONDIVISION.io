async function savePost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  if (!title || !content) return alert("제목과 내용을 입력하세요!");
  await fetch("/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  loadPosts();
}

async function loadPosts() {
  const res = await fetch("/posts");
  const posts = await res.json();
  document.getElementById("posts").innerHTML = posts
    .map(p => `<div class="post"><h3>${p.title}</h3><p>${p.content}</p><small>${p.date}</small></div>`)
    .join("");
}

loadPosts();