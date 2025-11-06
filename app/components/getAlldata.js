
export default async function getAlldata() {
  const result = await fetch("https://jamiatussunnah.onrender.com/post/api/")


    return result.json()
}
