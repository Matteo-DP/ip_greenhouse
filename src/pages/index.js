import Expand from "@/components/Expand";
import MoistureCard from "@/components/MoistureCard";
import Table from "@/components/Table";

export default function Home() {

  return (
    <main className="py-4">
      <h1 className='text-3xl mb-4'>Dashboard</h1>
      <MoistureCard />
      <Expand>
        <Table typeFilter={1} />
      </Expand>
      <Expand>
        <Table typeFilter={2} />
      </Expand>
      <Expand>
        <Table typeFilter={3} />
      </Expand>
    </main>
  )
}
