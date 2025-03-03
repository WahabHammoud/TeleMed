
import { features } from "@/data/featuresData";
import { FeatureCard } from "./FeatureCard";

export function FeaturesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          path={feature.path}
          color={feature.color}
        />
      ))}
    </div>
  );
}
