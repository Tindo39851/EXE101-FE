import React from "react";
import { useAppState } from "@/hooks/use-app-state";
import { plans } from "@/lib/data/listings";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/features/market/ListingCard";
import { MarketFilters } from "@/components/features/market/MarketFilters";
import { PlanCard } from "@/components/features/market/PlanCard";
import { StaggerContainer, StaggerItem } from "@/components/shared/Motion";

export function MarketView() {
  const {
    setView,
    state,
    searchQuery,
    setSearchQuery,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    trustSort,
    setTrustSort,
    gameFilter,
    setGameFilter,
    filteredListings,
    listings,
    currentUser,
    buyCart,
  } = useAppState();

  return (
    <section className="flex flex-col gap-6 bg-black p-0 select-none">
      {/* Page Header banner */}
      <PageHeader
        code="MKT_00 // SECURE NODE EXCHANGE"
        title="Escrow Marketplace"
        subtitle="Trade gaming accounts with mathematically verified trust metrics"
        backText="BACK TO HUB"
        onBack={() => setView("overview")}
        action={
          <Button
            variant="outline"
            onClick={() => setView("checkout")}
            className="border-fuchsia-500/40 text-fuchsia-400 hover:border-fuchsia-500 hover:bg-fuchsia-500/10 text-[10px] font-black tracking-wider"
          >
            VIEW ESCROW CART {state.cart ? "(1)" : "(EMPTY)"}
          </Button>
        }
      />

      {/* Filter toolbar */}
      <MarketFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        trustSort={trustSort}
        setTrustSort={setTrustSort}
        gameFilter={gameFilter}
        setGameFilter={setGameFilter}
      />

      {/* Grid status label */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 font-mono mt-2">
        <div className="text-slate-500 text-[10px] tracking-wider uppercase font-bold">
          ACTIVE BROKER NODES: <span className="text-cyan-400">{filteredListings.length}</span> / {listings.length}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)] animate-pulse" />
          <span className="text-emerald-400 text-[9px] font-black tracking-widest uppercase">
            ESCROW NODE STANDBY
          </span>
        </div>
      </div>

      {/* Grid listing */}
      {filteredListings.length === 0 ? (
        <EmptyState
          title="NO ACCOUNTS MATCH CORRESPONDING NODE FILTERS"
          message="Adjust search query, reset prices, or select another game node."
        />
      ) : (
        <StaggerContainer className="grid grid-cols-4 gap-6 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filteredListings.map((item) => (
            <StaggerItem key={item.id}>
              <ListingCard
                item={item}
                onBuy={(l) =>
                  buyCart({
                    id: l.id,
                    name: `${l.title} account (${l.badge})`,
                    price: l.price,
                    desc: `Secure escrow transfer, calculated trust score ${l.trust}, server ${l.server}.`,
                    kind: "listing",
                    referenceId: l.id,
                  })
                }
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Platform premium upgrades */}
      <div className="mt-12 flex flex-col gap-10">
        
        {/* B2C section */}
        <div className="flex flex-col gap-4">
          <SectionLabel code="UPG_01" label="INDIVIDUAL NODE BOOSTERS (B2C)" color="cyan" />
          <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            {plans
              .filter((plan) => plan.id !== "shop-pin")
              .map((plan) => {
                const allowed = plan.buyerRoles.includes(currentUser.role);
                return (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    allowed={allowed}
                    onSelect={(p) => buyCart({ id: p.id, name: p.name, price: p.price, desc: p.desc, kind: "premium", referenceId: p.id })}
                    accent="cyan"
                  />
                );
              })}
          </div>
        </div>

        {/* B2B section */}
        <div className="flex flex-col gap-4">
          <SectionLabel code="UPG_02" label="MERCHANT & SHOP ACCREDITATIONS (B2B)" color="fuchsia" />
          <div className="grid grid-cols-1">
            {plans
              .filter((plan) => plan.id === "shop-pin")
              .map((plan) => {
                const allowed = plan.buyerRoles.includes(currentUser.role);
                return (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    allowed={allowed}
                    onSelect={(p) => buyCart({ id: p.id, name: p.name, price: p.price, desc: p.desc, kind: "shop", referenceId: p.id })}
                    accent="fuchsia"
                  />
                );
              })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default MarketView;
