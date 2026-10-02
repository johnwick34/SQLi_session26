import itertools

def generate_wordlist():
    # Base components
    ranks = ['admin', 'administrator']
    symbols = ['-', '_', ''] # Empty string included for no symbol
    names = ['ifty']

    base_combinations = []
    
    # Generate structural combinations (e.g., admin-ifty, ifty_administrator)
    for rank in ranks:
        for symbol in symbols:
            for name in names:
                # Format: [Rank][Symbol][Name]
                base_combinations.append(f"{rank}{symbol}{name}")
                # Format: [Name][Symbol][Rank]
                base_combinations.append(f"{name}{symbol}{rank}")

    final_wordlist = set() # Use a set to automatically remove duplicates

    # Apply case permutations to each base combination
    for word in base_combinations:
        final_wordlist.add(word.lower())       # admin-ifty
        final_wordlist.add(word.upper())       # ADMIN-IFTY
        final_wordlist.add(word.title())       # Admin-Ifty
        
        # Add a specific variation where only the first letter of each part is capitalized
        parts = word.replace('_', '-').split('-')
        if len(parts) > 1:
            camel_case = word[0].lower() + "".join(word.title().split('-')[1:])
            pascal_case = word.title().replace('-', '').replace('_', '')
            final_wordlist.add(camel_case)
            final_wordlist.add(pascal_case)

    return sorted(list(final_wordlist))

if __name__ == "__main__":
    # Generate the list
    wordlist = generate_wordlist()
    
    # Save to a text file for Hydra
    filename = "targeted_usernames.txt"
    with open(filename, "w") as f:
        for username in wordlist:
            f.write(f"{username}\n")
            
    print(f"[*] Generated {len(wordlist)} targeted usernames.")
    print(f"[*] Saved to {filename}")
    
    # Print a small sample for the terminal
    print("\nSample of generated usernames:")
    for username in wordlist[:10]:
        print(f"  {username}")
    print("  ...")