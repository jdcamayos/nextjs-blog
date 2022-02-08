import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
	return (
		<Layout>
			{/* Add this <Head> tag */}
			<Head>
				<title>{postData.title}</title>
			</Head>
			{/* Keep the existing code here */}
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			</article>
			<br />
			{/* {postData.id}
			<br /> */}
			<div className={utilStyles.lightText}>
				{/* Replace {postData.date} with this */}
				<Date dateString={postData.date} />
			</div>
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</Layout>
	);
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
