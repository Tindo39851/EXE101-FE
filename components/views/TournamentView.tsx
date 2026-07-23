import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/ui/tabs";
import { TournamentCard } from "@/components/features/tournament/TournamentCard";
import { TournamentDetail } from "@/components/features/tournament/TournamentDetail";
import { BracketView } from "@/components/features/tournament/BracketView";

export function TournamentView() {
  const {
    setView,
    tournaments,
    selectedTour,
    setSelectedTour,
    tourTab,
    setTourTab,
    notify,
    buyCart,
    registeredTournamentIds,
  } = useAppState();

  const activeTour = tournaments.find((t) => t.id === selectedTour) || tournaments[0];
  const filteredTours = tournaments.filter((t) => tourTab === "ALL" || t.status === tourTab);

  // Tab configurations
  const filterTabs = [
    { id: "ALL", label: "ALL EVENTS", count: tournaments.length },
    { id: "LIVE", label: "● LIVE", count: tournaments.filter((t) => t.status === "LIVE").length },
    { id: "OPEN", label: "OPEN", count: tournaments.filter((t) => t.status === "OPEN").length },
    { id: "UPCOMING", label: "UPCOMING", count: tournaments.filter((t) => t.status === "UPCOMING").length },
  ];

  return (
    <section className="flex flex-col bg-black p-0 w-full select-none font-mono">
      {/* Page Header */}
      <PageHeader
        code="TOUR_00 // ESPORTS ARENA"
        title="Tournament Hub"
        subtitle="Compete in security-shielded tournaments and verify match outcomes"
        backText="BACK TO HOME"
        onBack={() => setView("overview")}
        glowColor="fuchsia"
        action={
          <Tabs
            tabs={filterTabs}
            activeTab={tourTab}
            onChange={setTourTab}
            variant="fuchsia"
            className="border-none p-0"
          />
        }
      />

      {/* Main Grid split */}
      <div className="w-full mt-8 grid grid-cols-[380px_1fr] gap-8 max-lg:grid-cols-1">
        
        {/* Left column: List of Tournaments */}
        <div className="flex flex-col justify-start items-start w-full">
          <span className="text-slate-500 text-[9px] font-black tracking-widest uppercase mb-4">
            [ EVENTS DETECTED // {filteredTours.length} SEEDS ]
          </span>

          <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[700px] pr-2">
            {filteredTours.map((t) => {
              const isRegistered = registeredTournamentIds.includes(t.id);
              return (
                <TournamentCard
                  key={t.id}
                  tournament={t}
                  isActive={selectedTour === t.id}
                  isRegistered={isRegistered}
                  onClick={() => setSelectedTour(t.id)}
                />
              );
            })}
          </div>
        </div>

        {/* Right column: Details and Brackets */}
        <div className="flex flex-col justify-start items-start w-full gap-6">
          {activeTour ? (
            <>
              {/* Event Details Card */}
              <TournamentDetail
                tournament={activeTour}
                isRegistered={registeredTournamentIds.includes(activeTour.id)}
                onJoin={(t) =>
                  buyCart({
                    id: `tour-${t.id}`,
                    name: `Slot: ${t.title}`,
                    price: t.entryFee,
                    desc: `Entry slot fee for ${t.title}. 25% hosting fee included.`,
                    kind: "tournament",
                    referenceId: t.id,
                  })
                }
                onSpectate={() => notify("Connecting to spectating viewport feeds...")}
              />

              {/* Bracket Tree visual */}
              <BracketView bracket={activeTour.bracket} startsIn={activeTour.startsIn} />
            </>
          ) : (
            <div className="w-full py-20 text-center text-slate-500 uppercase border border-dashed border-fuchsia-500/25">
              Select an active event from the lineup panel.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default TournamentView;
