import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const stores = ["Carrefour", "Lidl", "E.Leclerc", "Auchan", "Intermarché", "Monoprix", "Aldi", "Super U", "Casino"];

const recipes = [
  { name: "Poulet, riz et légumes", category: "Équilibré", minutes: 25, price: 3.20, ingredients: ["150 g de poulet", "80 g de riz", "150 g de légumes", "Épices"] , steps: "Fais cuire le riz. Fais revenir le poulet et les légumes avec les épices, puis sers avec le riz."},
  { name: "Pâtes à la tomate et au fromage", category: "Végétarien", minutes: 20, price: 1.80, ingredients: ["100 g de pâtes", "150 g de tomates concassées", "20 g de fromage râpé", "Ail"] , steps: "Fais cuire les pâtes. Chauffe les tomates avec l’ail, mélange avec les pâtes et ajoute le fromage."},
  { name: "Omelette et salade", category: "Rapide", minutes: 15, price: 2.10, ingredients: ["2 œufs", "Une poignée de salade", "1 tomate", "2 tranches de pain"] , steps: "Bats les œufs et cuis l’omelette à la poêle. Accompagne de salade, tomate et pain."},
  { name: "Dahl de lentilles corail", category: "Végétarien", minutes: 30, price: 1.60, ingredients: ["100 g de lentilles corail", "100 ml de lait de coco", "60 g de riz", "Curry"] , steps: "Rince les lentilles. Fais-les mijoter avec le lait de coco, un peu d’eau et le curry. Sers avec le riz."},
  { name: "Wrap thon et crudités", category: "Rapide", minutes: 10, price: 2.50, ingredients: ["2 tortillas", "½ boîte de thon", "½ concombre", "Yaourt nature"] , steps: "Mélange le thon avec une cuillère de yaourt. Ajoute le concombre coupé et garnis les tortillas."},
  { name: "Poêlée de pommes de terre", category: "Économique", minutes: 25, price: 1.50, ingredients: ["250 g de pommes de terre", "1 oignon", "1 œuf", "Herbes"] , steps: "Coupe les pommes de terre en dés et fais-les dorer avec l’oignon. Ajoute l’œuf et les herbes."}
];

function App() {
  const [store, setStore] = useState("Carrefour");
  const [days, setDays] = useState(7);
  const [meals, setMeals] = useState(2);
  const [people, setPeople] = useState(1);
  const [budget, setBudget] = useState(50);
  const [plan, setPlan] = useState(null);
  const [checked, setChecked] = useState([]);

  function generatePlan() {
    const count = days * meals;
    const generated = Array.from({ length: count }, (_, i) => ({
      ...recipes[i % recipes.length],
      id: i,
      day: Math.floor(i / meals) + 1,
      meal: meals === 1 ? "Repas" : (i % meals === 0 ? "Déjeuner" : "Dîner")
    }));
    setPlan(generated);
    setChecked([]);
  }

  const shoppingList = useMemo(() => {
    if (!plan) return [];
    return [...new Set(plan.flatMap(recipe => recipe.ingredients))];
  }, [plan]);

  const estimated = plan
    ? plan.reduce((sum, recipe) => sum + recipe.price * people, 0)
    : 0;

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-icon">✳</span> MealMate</a>
        <span className="tag">TON ASSISTANT COURSES & REPAS</span>
      </header>

      <section className="hero">
        <p className="eyebrow">MANGE BIEN, DÉPENSE MOINS</p>
        <h1>Les repas de ta semaine,<br/><em>sans dépasser ton budget.</em></h1>
        <p className="intro">Choisis ton magasin, ton budget et le nombre de repas. MealMate prépare un menu et une liste de courses.</p>
      </section>

      <section className="panel settings">
        <div className="section-heading"><span>01</span><h2>Configure ton planning</h2></div>
        <div className="form-grid">
          <label className="field">
            <span>Supermarché</span>
            <select value={store} onChange={e => setStore(e.target.value)}>
              {stores.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Nombre de jours</span>
            <div className="inline-control"><input type="number" min="1" max="30" value={days} onChange={e => setDays(Math.max(1, Math.min(30, Number(e.target.value))))}/><small>jours</small></div>
          </label>
          <label className="field">
            <span>Repas par jour</span>
            <select value={meals} onChange={e => setMeals(Number(e.target.value))}>
              <option value="1">1 repas par jour</option>
              <option value="2">2 repas par jour</option>
            </select>
          </label>
          <label className="field">
            <span>Nombre de personnes</span>
            <select value={people} onChange={e => setPeople(Number(e.target.value))}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} personne{n > 1 ? "s" : ""}</option>)}
            </select>
          </label>
          <label className="field budget-field">
            <span>Budget total</span>
            <div className="budget-value">{budget} €</div>
            <input type="range" min="10" max="250" step="5" value={budget} onChange={e => setBudget(Number(e.target.value))}/>
            <div className="range-labels"><small>10 €</small><small>250 €</small></div>
          </label>
        </div>
        <button className="primary" onClick={generatePlan}>Générer mon planning <span>↗</span></button>
      </section>

      {plan && <>
        <section className="results-header">
          <div><p className="eyebrow">02 · TON MENU</p><h2>{days} jours de repas</h2><p className="muted">{store} · {people} personne{people > 1 ? "s" : ""} · {plan.length} repas</p></div>
          <div className="estimate"><small>Estimation indicative</small><strong>{estimated.toFixed(2).replace(".", ",")} €</strong><span className={estimated <= budget ? "within" : "over"}>{estimated <= budget ? `Dans ton budget de ${budget} €` : `Au-dessus du budget de ${budget} €`}</span></div>
        </section>
        <section className="recipe-grid">
          {plan.map(recipe => <article className="recipe-card" key={recipe.id}>
            <div className="recipe-top"><span className="day">{`JOUR ${recipe.day} · ${recipe.meal.toUpperCase()}`}</span><span className="category">{recipe.category}</span></div>
            <h3>{recipe.name}</h3>
            <div className="recipe-meta"><span>◷ {recipe.minutes} min</span><span>≈ {(recipe.price * people).toFixed(2).replace(".", ",")} €/portion{people > 1 ? "s" : ""}</span></div>
            <h4>Ingrédients</h4>
            <ul>{recipe.ingredients.map(item => <li key={item}>{item}</li>)}</ul>
            <details><summary>Voir la préparation</summary><p>{recipe.steps}</p></details>
          </article>)}
        </section>
        <section className="panel shopping">
          <div className="section-heading"><span>03</span><h2>Ta liste de courses</h2></div>
          <p className="muted">Coche les produits au fur et à mesure de tes achats.</p>
          <div className="shopping-list">
            {shoppingList.map(item => <label className={checked.includes(item) ? "shopping-item done" : "shopping-item"} key={item}>
              <input type="checkbox" checked={checked.includes(item)} onChange={e => setChecked(old => e.target.checked ? [...old, item] : old.filter(x => x !== item))}/>
              <span>{item}</span>
            </label>)}
          </div>
          <div className="list-footer">{checked.length} / {shoppingList.length} produits cochés</div>
        </section>
      </>}

      <footer><strong>MealMate</strong><span>Les prix affichés sont fictifs et servent de démonstration. Les catalogues et prix réels des enseignes ne sont pas encore connectés.</span></footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
