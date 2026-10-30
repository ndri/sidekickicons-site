<script lang="ts">
  import ButtonSelect from "./ButtonSelect.svelte";
  import { storedState } from "$lib/util/storedState.svelte";

  type Theme = "Light" | "Dark" | "System";

  const theme = storedState<Theme>("theme", "System");

  function setDarkTheme(root: HTMLElement) {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }

  function setLightTheme(root: HTMLElement) {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  // The initial theme is applied before first paint by the script in app.html
  $effect(() => {
    const root = window.document.documentElement;

    if (theme.value === "Light") {
      setLightTheme(root);
    } else if (theme.value === "Dark") {
      setDarkTheme(root);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemPrefersDark) {
        setDarkTheme(root);
      } else {
        setLightTheme(root);
      }
    }
  });
</script>

<div class="flex items-center justify-center gap-2">
  <ButtonSelect
    label="Theme"
    selectedValue={theme.value}
    setSelectedValue={(value) => (theme.value = value)}
    values={["Light", "Dark", "System"]}
  />
</div>
