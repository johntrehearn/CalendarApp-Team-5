import Link from "next/link";
import Image from "next/image";
function PageNotFound() {
  return (
    <main>
      <h1>There was the problem</h1>
      <p>We could not find the page you are looking for.</p>
      <p>
        Go to <Link href="/"> HomePage</Link>
      </p>
      <Image src="/image.jpg" alt="Image" width={500} height={500} />
    </main>
  );
}
export default PageNotFound;
