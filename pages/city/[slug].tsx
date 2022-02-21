import { API_URL } from "../../config";
import Head from "next/head"
import { useRouter } from "next/router";
interface IPage {
    description: string
    city: string
    slug: string
    pageTitle: string
    meta: {name: string, content : string}[]
    faq: {question : string, answer: string}[]
}
export default function Page(props : {page : IPage, cities : IPage[] }) {
  let data = useRouter()
  return (
    <>
    <Head>
        <title>{props?.page?.pageTitle}</title>
        <meta name="description" content={props?.page?.description}/>
        {props?.page?.meta?.map((v, i) => (
            <meta key={i} name={v?.name} content={v?.content}/>
        ))}
    </Head>
    <div className="text-base font-light text-gray-700 md:px-12 p-1">
      <p>{props?.page?.description}</p>
    </div>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 divide-y divide-gray-200 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <dl className="divide-y divide-gray-200">
              {props?.page?.faq?.map((faq, i) => (
                <div
                  key={i}
                  className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8"
                >
                  <dt className="text-base font-medium text-gray-900 md:col-span-5">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 md:mt-0 md:col-span-7">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav className="-mx-5 -my-2 grid grid-cols-5 md:px-8" aria-label="Footer">
          {props?.cities?.map((v, i) => (
            <div key={i} className="px-5 py-2">
              <a href={`/${data.locale}/city/${v?.city}`} className="text-base text-gray-500 hover:text-gray-900">
                {v?.city}
              </a>
            </div>
          ))}
        </nav>
        
        <p className="mt-8 text-center text-base text-gray-400">&copy; 2020 Staffinow, Inc. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}

export async function getServerSideProps(ctx : any) {
  let slug = ctx.params.slug;
  //console.log(ctx.locale)
  let resp = await fetch(`${API_URL}/pages?slug=${slug}&locale=${ctx.locale}`);
  let cityResp = await fetch(`${API_URL}/pages`)
  let page
  let cities
  if(resp.ok){
      //@ts-ignore
      let pages = await resp.json()
      if(pages.length === 0) return {notFound : true}
      page = pages[0]
      cities = await cityResp.json()
  }
  return {
      props : {
          page,
          cities
      }
  }
}
