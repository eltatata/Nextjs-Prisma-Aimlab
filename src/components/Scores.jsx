import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getUserScores = async () => {
  const session = await getServerSession(authOptions);

  const userScores = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      scores: {
        orderBy: {
          points: "desc"
        },
        take: 10
      }
    }
  })

  return userScores.scores;
}

async function Scores() {
  const scores = await getUserScores();

  return (
    <aside className="w-[25vh] p-6 bg-[#0D0D0D] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Your Top 10 Scores</h2>
      <div className="flex flex-col gap-4">
        {scores.map((score, index) => (
          <div
            key={score.id}
            className="flex flex-col bg-white font-bold rounded-lg gap-2 p-8"
          >
            <div className="flex justify-between items-center">
              <p className="text-black">Score #{index + 1}</p>
              <p className="py-1 px-2 rounded-3xl text-sm bg-black">{score.points}</p>
            </div>
            <p className="text-black">Date: {new Date(score.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Scores