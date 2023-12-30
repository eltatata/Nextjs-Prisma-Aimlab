import prisma from "@/libs/prisma";

const getGlobalScores = async () => {
  const scores = await prisma.score.findMany({
    select: {
      id: true,
      points: true,
      author: {
        select: {
          username: true
        }
      },
      createdAt: true
    },
    orderBy: {
      points: "desc"
    },
    take: 10
  });

  return scores
}

async function Globals() {
  const scores = await getGlobalScores();

  return (
    <aside className="w-[25vh] p-6 bg-[#0D0D0D] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Top 10 Global Scores</h2>
      <div className="flex flex-col gap-4">
        {scores.map((score) => (
          <div
            key={score.id}
            className="flex flex-col bg-white font-bold rounded-lg gap-2 p-8"
          >
            <div className="flex justify-between items-center">
              <p className="text-black">{score.author.username}</p>
              <p className="py-1 px-2 rounded-3xl text-sm bg-black">{score.points}</p>
            </div>
            <p className="text-black">Date: {new Date(score.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Globals